from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse
from django.contrib import messages
from django.contrib.auth.models import User
from django.http import JsonResponse
#from .models import Internship,Compulsary,Optional
import json
import requests
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
import string 
import random


# Create your views here.

cluster=MongoClient('mongodb+srv://atharva:<password>@basicdb.4nvfs.mongodb.net/<db>?retryWrites=true&w=majority')
db=cluster['http']
collection=db['history']

def common(request):
    id=''.join(random.choices(string.ascii_uppercase +string.digits, k = 10))
    if('id' in request.COOKIES):
        response = render(request, 'index.html',{'cookie':request.COOKIES['id']})
    else:
        response = render(request, 'index.html',{'cookie':'No cookie'})
        response.set_cookie('id',id)
    return response



def specific(request,id):
    if(request.method=='GET'):
        id=str(id)
        find=collection.find_one({'_id': ObjectId(id)})
        #print(find)
        find['_id']=str(find['_id'])
        return JsonResponse(find,safe=False)

def result(request):
    if(request.method=='GET'):
        if('id' in request.COOKIES):
            id=request.COOKIES['id']
            find=list(collection.find({'cookie':id}))
        else:
            find=[]
        for i in find:
            i['_id']=str(i['_id'])
        return JsonResponse(find,safe=False)
    elif(request.method=='POST'):
        id=0
        if('id' in request.COOKIES):
            id=request.COOKIES['id']
        info = request.body.decode('utf8').replace("'", '"')
        info=eval(info)
        err=''
        final_answer={'headers':[],'cookies':[],'body':'','json':'','err':err}
        query={}
        a=[]
        for i in info["request_query_fields"]:
            query[i['key']]=i['value']
            if(i['key']!=''):
                a.append(i)
        info["request_query_fields"]=a
        headers={}
        a=[]
        for i in info['request_header_fields']:
            headers[i['key']]=i['value']
            if(i['key']!=''):
            	a.append(i)

        info['request_header_fields']=a
        body={}
        answer=0
        if('' in query):
            query.pop('') 
        if('' in headers):
            headers.pop('')
        if(info['method']=='POST'):
            a=[]
            for i in info['request_body_fields']:
                body[i['key']]=i['value']
                if(i['key']!=''):
                    a.append(i)

            info['request_body_fields']=a
            if('' in body):
                body.pop('')

            try:
                answer=requests.post(info['url'],params=query,headers=headers,data=body)
            except:
                final_answer['err']='An error occured, Try Again !'
                return JsonResponse(final_answer,safe=False)

        elif(info['method']=='GET'):
            try:
                answer=requests.get(info['url'],params=query,headers=headers)
            except:
                final_answer['err']='An error occured, Try Again !'
                return JsonResponse(final_answer,safe=False)

        elif(info['method']=='HEAD'):
            try:
                answer=requests.head(info['url'],params=query,headers=headers)
            except:
                final_answer['err']='An error occured, Try Again !'
                return JsonResponse(final_answer,safe=False)

        a=[]
        b=[]
        for i in answer.headers:
            new_header={'key':'','value':''}
            new_header['key']=i
            new_header['value']=answer.headers[i]
            a.append(new_header)
        for cookie in answer.cookies:
            new_cookie={'key':'','value':'','secure':'','expires':''}
            new_cookie['key']=cookie.name
            new_cookie['value']=cookie.value
            new_cookie['secure']=cookie.secure
            new_cookie['expires']=cookie.expires
            b.append(new_cookie)
        final_answer['headers']=a
        final_answer['cookies']=b
        final_answer['status']=answer.status_code
        time_req=answer.elapsed.total_seconds()*1000
        time_req=round(time_req,3)
        final_answer['time']=time_req
        final_answer['body']=answer.text
        final_answer['json']=answer.text

        new_object={}
        new_object['method']=info['method']
        new_object['url']=info['url']
        new_object['query']=info["request_query_fields"]
        new_object['request_headers']=info['request_header_fields']

        if(info['method']=='POST'):
            new_object['request_body']=info['request_body_fields']

        new_object['status']=answer.status_code
        new_object['time']=answer.elapsed.total_seconds()*1000
        new_object['response_headers']=a
        new_object['cookies']=b
        new_object['cookie']=id

        try:
            final_answer['json']=answer.json()
            new_object['response_body']=answer.json()
        except:
            final_answer['json']=answer.text
            new_object['response_body']=answer.text

        returned_object=collection.insert_one(new_object)
        final_answer['id']=str(returned_object.inserted_id)
        if('_id' in final_answer):
            final_answer['_id']=str(final_answer['_id'])
        return JsonResponse(final_answer,safe=False)

