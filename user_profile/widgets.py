from django import forms
from django.utils.safestring import mark_safe

class ImageWidget(forms.FileInput):
    """
    A ImageField Widget for admin that shows a thumbnail.
    """

    def __init__(self, attrs={}):
        super(ImageWidget, self).__init__(attrs)

    def render(self, name, value, attrs=None):
        output = []
        if value and hasattr(value, "url"):
            output.append(('<a target="_blank" href="%s">'
                           '<img src="%s"  /></a> '
                           % (value.url, value.url)))
        output.append(super(ImageWidget, self).render(name, value, attrs))
        return mark_safe(u''.join(output))