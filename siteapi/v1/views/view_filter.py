"""
common view filter
"""
from django.urls import get_resolver, set_urlconf
from rest_framework import generics
from rest_framework.response import Response


class MetaAPIView(generics.GenericAPIView):
    permission_classes = []
    queryset = []

    def get(self, request, api_path):
        resolver = get_resolver()

        resolver_match = resolver.resolve('/siteapi/v1' + api_path)
        callback, callback_args, callback_kwargs = resolver_match
        return Response(data=callback.cls.get_query_meta())


class ViewFilter:

    conditions = {
        'number': [
            {
                'name': '大于',
                'key': '__gt',
            },
            {
                'name': '大于',
                'key': '__lt',
            }
        ],
        'text': [
            {
                'name': '等于',
                'key': '=',
            },
            {
                'name': '包含',
                'key': '__contain',
            }
        ]
    }

    @classmethod
    def get_query_meta(cls):
        items = cls.get_query_item()
        for item in items:
            if item['type'] in cls.conditions.keys():
                item['conditions'] = cls.conditions[item['type']]

        return items

    @classmethod
    def get_query_item(cls):
        return []
