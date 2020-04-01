from django.http import HttpResponse
from django.shortcuts import render
from django.utils.safestring import mark_safe
from django.template import Library
from django.views.decorators.csrf import csrf_exempt
from django.conf import settings
import chardet    
import random



import pandas as pd
import mysql.connector
from sqlalchemy import types, create_engine

import os
import json

def get_country_wise_sales():
	mydb = mysql.connector.connect(host=settings.MYSQL_HOST_IP, user=settings.MYSQL_USER, passwd=settings.MYSQL_PASSWORD, database=settings.MYSQL_DATABASE)
	cursor = mydb.cursor(dictionary=True)

	load_query="""SELECT
LOWER(`code`) AS COUNTRY,
ROUND(SUM(SALES)) AS SALES
FROM
`sales_data` A
LEFT JOIN
country B
ON
LOWER(A.`COUNTRY`) = LOWER(B.`countryname`)
GROUP BY 1"""
	cursor.execute(load_query)
	rows = cursor.fetchall()
	
	data={}
	for row in rows:
		data[row['COUNTRY']]=row['SALES']
	print(data)
	return json.dumps(data)

def get_total_orders():
	mydb = mysql.connector.connect(host=settings.MYSQL_HOST_IP, user=settings.MYSQL_USER, passwd=settings.MYSQL_PASSWORD, database=settings.MYSQL_DATABASE)
	cursor = mydb.cursor(dictionary=True)

	load_query=""" SELECT
COUNT(DISTINCT ORDERNUMBER) AS ORDERS
FROM
`sales_data`"""
	cursor.execute(load_query)
	rows = cursor.fetchone()
	return rows['ORDERS']
	
def get_total_sales():
	mydb = mysql.connector.connect(host=settings.MYSQL_HOST_IP, user=settings.MYSQL_USER, passwd=settings.MYSQL_PASSWORD, database=settings.MYSQL_DATABASE)
	cursor = mydb.cursor(dictionary=True)

	load_query=""" SELECT
SUM(SALES) AS SALES
FROM
`sales_data`"""
	cursor.execute(load_query)
	rows = cursor.fetchone()
	return round(rows['SALES'])
	
def get_total_product_lines():
	mydb = mysql.connector.connect(host=settings.MYSQL_HOST_IP, user=settings.MYSQL_USER, passwd=settings.MYSQL_PASSWORD, database=settings.MYSQL_DATABASE)
	cursor = mydb.cursor(dictionary=True)

	load_query=""" SELECT
COUNT(DISTINCT PRODUCTLINE) AS PRODUCTLINE
FROM
`sales_data`"""
	cursor.execute(load_query)
	rows = cursor.fetchone()
	return round(rows['PRODUCTLINE'])

def get_total_customers():
	mydb = mysql.connector.connect(host=settings.MYSQL_HOST_IP, user=settings.MYSQL_USER, passwd=settings.MYSQL_PASSWORD, database=settings.MYSQL_DATABASE)
	cursor = mydb.cursor(dictionary=True)

	load_query=""" SELECT
COUNT(DISTINCT CUSTOMERNAME) AS CUSTOMERNAME
FROM
`sales_data`"""
	cursor.execute(load_query)
	rows = cursor.fetchone()
	return round(rows['CUSTOMERNAME'])

def get_quarter_wise_comparison():
	mydb = mysql.connector.connect(host=settings.MYSQL_HOST_IP, user=settings.MYSQL_USER, passwd=settings.MYSQL_PASSWORD, database=settings.MYSQL_DATABASE)
	cursor = mydb.cursor(dictionary=True)

	load_query="""
	SELECT
CONCAT(`YEAR_ID`,'-',`QTR_ID`) AS Q
FROM
`sales_data`
GROUP BY 1
ORDER BY 1
	"""
	cursor.execute(load_query)
	rows = cursor.fetchall()

	quarters=[]

	for row in rows:
	    quarters.append(row['Q'])

	load_query="""
	SELECT
	`PRODUCTLINE` as PROD
	FROM
	`sales_data`
	GROUP BY 1
	ORDER BY 1
	"""
	cursor.execute(load_query)
	rows = cursor.fetchall()

	prods=[]
	for row in rows:
	    prods.append(row['PROD'])

	get_colors = lambda n: list(map(lambda i: "#" + "%06x" % random.randint(0, 0xFFFFFF),range(n)))

	colors=get_colors(len(prods))
	backgroundColor=get_colors(len(prods))
	borderColor=get_colors(len(prods))
	pointColor=get_colors(len(prods))
	pointStrokeColor=get_colors(len(prods))
	pointHighlightFill=get_colors(len(prods))
	pointHighlightStroke=get_colors(len(prods))
	    
	datasets=[]
	i=0
	for prod in prods:
		data=[]
		for q in quarters:
			query="""SELECT
	ROUND(SUM(`SALES`)) AS SALES
	FROM
	`sales_data`
	WHERE
	PRODUCTLINE = '"""+str(prod)+"""'
	AND
	CONCAT(`YEAR_ID`,'-',`QTR_ID`)='"""+str(q)+"""'
	"""
			print(query)
			cursor.execute(query)
			rows = cursor.fetchone()
			data.append(rows['SALES'])
        
		datasets.append({'label': prod,'borderColor':borderColor[i], 'pointColor':pointColor[i], 'data': data})
		i=i+1
	final_data={'labels':quarters,'datasets':datasets}
	print(final_data)
	return json.dumps(final_data)


def get_year_wise_comparison():
	mydb = mysql.connector.connect(host=settings.MYSQL_HOST_IP, user=settings.MYSQL_USER, passwd=settings.MYSQL_PASSWORD, database=settings.MYSQL_DATABASE)
	cursor = mydb.cursor(dictionary=True)

	load_query="""
	SELECT
	MONTHNAME(`ORDERDATE`) AS MONTH_,
	EXTRACT(MONTH FROM ORDERDATE) as RN
	FROM
	`sales_data`
	GROUP BY 1
	ORDER BY 2 ASC
	"""
	cursor.execute(load_query)
	rows = cursor.fetchall()

	months=[]

	for row in rows:
	    months.append(row['MONTH_'])

	load_query="""
	SELECT
	EXTRACT(YEAR FROM `ORDERDATE`) as YEAR_
	FROM
	`sales_data`
	GROUP BY 1
	ORDER BY 1
	"""
	cursor.execute(load_query)
	rows = cursor.fetchall()

	years=[]
	for row in rows:
	    years.append(row['YEAR_'])

	get_colors = lambda n: list(map(lambda i: "#" + "%06x" % random.randint(0, 0xFFFFFF),range(n)))

	colors=get_colors(len(years))
	backgroundColor=get_colors(len(years))
	borderColor=get_colors(len(years))
	pointColor=get_colors(len(years))
	pointStrokeColor=get_colors(len(years))
	pointHighlightFill=get_colors(len(years))
	pointHighlightStroke=get_colors(len(years))
	    
	datasets=[]
	i=0
	for year in years:
		data=[]
		for mon in months:
			query="""SELECT
	ROUND(SUM(`SALES`)) AS SALES
	FROM
	`sales_data`
	WHERE
	EXTRACT(YEAR FROM `ORDERDATE`) = """+str(year)+"""
	AND
	MONTHNAME(`ORDERDATE`)='"""+str(mon)+"""'
	"""
			print(query)
			cursor.execute(query)
			rows = cursor.fetchone()
			data.append(rows['SALES'])
        
		datasets.append({'label': year,'borderColor':borderColor[i], 'pointColor':pointColor[i], 'pointStrokeColor':pointStrokeColor[i] , 'pointHighlightFill':pointHighlightFill[i],'pointHighlightStroke':pointHighlightStroke[i], 'data': data})
		i=i+1
	final_data={'labels':months,'datasets':datasets}
	print(final_data)
	return json.dumps(final_data)

def get_bar_chart():
	mydb = mysql.connector.connect(host=settings.MYSQL_HOST_IP, user=settings.MYSQL_USER, passwd=settings.MYSQL_PASSWORD, database=settings.MYSQL_DATABASE)
	cursor = mydb.cursor(dictionary=True)

	load_query="""
	SELECT
	MONTHNAME(`ORDERDATE`) AS MONTH_,
	EXTRACT(MONTH FROM ORDERDATE) as RN
	FROM
	`sales_data`
	GROUP BY 1
	ORDER BY 2 ASC
	"""
	cursor.execute(load_query)
	rows = cursor.fetchall()

	months=[]

	for row in rows:
	    months.append(row['MONTH_'])

	load_query="""
	SELECT
	PRODUCTLINE AS PRODUCTLINE
	FROM
	`sales_data`
	GROUP BY 1
	ORDER BY 1
	"""
	cursor.execute(load_query)
	rows = cursor.fetchall()

	prods=[]
	for row in rows:
	    prods.append(row['PRODUCTLINE'])

	get_colors = lambda n: list(map(lambda i: "#" + "%06x" % random.randint(0, 0xFFFFFF),range(n)))

	colors=get_colors(len(prods))    
	datasets=[]
	i=0
	pie_data=[]
	for prod in prods:
		query="""SELECT
		ROUND(SUM(`SALES`)) AS SALES
		FROM
		`sales_data`
		WHERE
		`PRODUCTLINE` = '"""+prod+"""'		
		"""
		cursor.execute(query)
		rows = cursor.fetchone()
		pie_data.append(rows['SALES'])
		data=[]
		for mon in months:
			query="""SELECT
	ROUND(SUM(`SALES`)) AS SALES
	FROM
	`sales_data`
	WHERE
	`PRODUCTLINE` = '"""+prod+"""'		
	AND
	MONTHNAME(`ORDERDATE`)='"""+mon+"""'
	"""
			cursor.execute(query)
			rows = cursor.fetchone()
			data.append(rows['SALES'])
		datasets.append({'label': prod,'backgroundColor': colors[i],'data': data})
		i=i+1
	final_data={'labels':months,'datasets':datasets}
	final_pie_data={'labels':prods,'datasets':[{'data':pie_data,'backgroundColor':colors}]}
	
	ret={'bar_chart':json.dumps(final_data),'pie_chart':json.dumps(final_pie_data)}
	return ret

def index(request):
	product_analysis=get_bar_chart()
	context_vars={'orders':get_total_orders(),'sales':get_total_sales(),'prods':get_total_product_lines(),'çustomers':get_total_customers(),'bar_chart':product_analysis['bar_chart'],'pie_chart':product_analysis['pie_chart'],'year_wise':get_year_wise_comparison(),'quarter':get_quarter_wise_comparison(),'world':get_country_wise_sales()}
	print(product_analysis['pie_chart'])
	return render(request, 'mvp/index.html',context_vars)

@csrf_exempt
def upload_file(request):
	engine = create_engine('mysql+mysqlconnector://'+settings.MYSQL_USER+':'+settings.MYSQL_PASSWORD+'@'+settings.MYSQL_HOST_IP+':'+settings.MYSQL_PORT+'/'+settings.MYSQL_DATABASE, echo=False)

	if request.method == 'POST':
		delimiter=request.POST.get("delimiter", "")
		files = request.FILES.getlist('myFile')
		print(files)
		path=settings.FILE_UPLOAD_PATH
		for file in files:
			filename=file.name
			print("Uploading "+str(filename))
			#ts = time.time()
			full_filename = os.path.join(path, filename)
			fout = open(full_filename, 'wb+')
			for chunk in file.chunks():
				fout.write(chunk)
				file_path=full_filename
			fout.close()
			first_insert=1
			rawdata = open(path+filename, 'rb').read()
			result = chardet.detect(rawdata)
			charenc = result['encoding']
			print(charenc)
			for df in pd.read_csv(path+filename, chunksize=settings.CHUNKSIZE,sep=delimiter,encoding=charenc):
			    if first_insert==1:
			        df.to_sql(name='sales_data', con=engine, if_exists='replace', index=False, chunksize=settings.CHUNKSIZE)
			        first_insert=0
			    else:
			        df.to_sql(name='sales_data', con=engine, if_exists='append', index=False, chunksize=settings.CHUNKSIZE)
		product_analysis=get_bar_chart()
		context_vars={'orders':get_total_orders(),'sales':get_total_sales(),'prods':get_total_product_lines(),'çustomers':get_total_customers(),'bar_chart':product_analysis['bar_chart'],'pie_chart':product_analysis['pie_chart'],'year_wise':get_year_wise_comparison(),'quarter':get_quarter_wise_comparison(),'world':get_country_wise_sales()}
	return render(request, 'mvp/index.html',context_vars)
	return render(request, 'mvp/index.html',context_vars)