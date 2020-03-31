from django.http import HttpResponse
from django.shortcuts import render
import json


def get_total_orders():
	return 10
	
def get_total_sales():
	return 10
	
def get_total_product_lines():
	return 10

def get_total_customers():
	return 10


def get_bar_chart():
	dict={labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],datasets: [{label: 'Dataset 1',backgroundColor: 'red',data: [238, 252, 276, 513, 637, 745, 769]}, {label: 'Dataset 2',backgroundColor: 'blue',data: [214, 217, 221, 425, 427, 456, 765]}, {label: 'Dataset 3',backgroundColor: 'green',data: [52, 79, 674, 678, 784, 899, 913]}]}
	return json.dumps(dict)

def index(request):
	context_vars={'orders':get_total_orders(),'sales':get_total_sales(),'prods':get_total_product_lines(),'çustomers':get_total_customers(),'bar_chart':get_bar_chart()}
	return render(request, 'mvp/index.html',context_vars)