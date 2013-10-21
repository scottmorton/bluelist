
"""
djson: json utils for django
Slightly modified verison of https://github.com/samuelclay/NewsBlur/blob/master/utils/json_functions.py
"""

from django.db import models
from django.utils.functional import Promise
from django.utils.encoding import force_unicode
from django.core import serializers
from django.http import HttpResponse
from django.db.models.query import QuerySet
from decimal import Decimal
import datetime
import json

def _to_json(data, *args, **kwargs):
    """
    The main issues with django's default json serializer is that properties that
    had been added to an object dynamically are being ignored (and it also has
    problems with some models).
    """

    def _any(data):
        ret = None
        # Opps, we used to check if it is of type list, but that fails
        # i.e. in the case of django.newforms.utils.ErrorList, which extends
        # the type "list". Oh man, that was a dumb mistake!
        if hasattr(data, 'as_dict'):
            ret = _dict(data.as_dict())
        elif hasattr(data, 'canonical'):
            ret = data.canonical()
        elif isinstance(data, list):
            ret = _list(data)
        elif isinstance(data, set):
            ret = _list(list(data))
        # Same as for lists above.
        elif isinstance(data, dict):
            ret = _dict(data)
        elif isinstance(data, Decimal):
            # json.dumps() cant handle Decimal
            ret = str(data)
        elif isinstance(data, models.query.QuerySet):
            # Actually its the same as a list ...
            ret = _list(data)
        elif isinstance(data, models.Model):
            ret = _model(data)
        # here we need to encode the string as unicode (otherwise we get utf-16 in the json-response)
        elif isinstance(data, basestring):
            ret = unicode(data)
        # see http://code.djangoproject.com/ticket/5868
        elif isinstance(data, Promise):
            ret = force_unicode(data)
        elif isinstance(data, datetime.datetime) or isinstance(data, datetime.date):
            ret = data.isoformat()
        elif hasattr(data, '__call__'):
            ret = data()
        else:
            ret = data
        return ret

    def _model(data):
        ret = {}
        # If we only have a model, we only want to encode the fields.

        exclude = getattr(data, 'json_exclude', [])

        for f in data._meta.fields:
            if f.name not in exclude:
                ret[f.name] = _any(getattr(data, f.name))

        extra = getattr(data, 'json_extra', {})
        if hasattr(extra, '__call__'):
            ret.update(extra())

        # And additionally encode arbitrary properties that had been added.
        """
        fields = dir(data.__class__) + ret.keys()
        add_ons = [k for k in dir(data) if k not in fields]
        for k in add_ons:
            ret[k] = _any(getattr(data, k))
        """
        return ret

    def _list(data):
        ret = []
        for v in data:
            ret.append(_any(v))
        return ret

    def _dict(data):
        ret = {}
        for k, v in data.items():
            ret[str(k)] = _any(v)
        return ret

    if hasattr(data, 'to_json'):
        data = data.to_json()
    ret = _any(data)
    return json.dumps(ret)

#------------------------------------
# public methods
#------------------------------------

def decode(data):
    if not data:
        return data
    return json.loads(data)

def encode(data, *args, **kwargs):
    # Careful, ValuesQuerySet is a dict
    if type(data) == QuerySet:
        # Django models
        return serializers.serialize("json", data, *args, **kwargs)
    else:
        return _to_json(data, *args, **kwargs)

def response(data, status = 200):
    if not isinstance(data, basestring):
        data = _to_json(data)
    return HttpResponse(data, content_type='application/json', status=status)

def main():
    test = {1: True, 2: u"string", 3: 30}
    json_test = encode(test)
    print test, json_test

if __name__ == '__main__':
    main()