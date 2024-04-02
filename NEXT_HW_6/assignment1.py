from bs4 import BeautifulSoup
from openpyxl import Workbook
import requests

base_url="https://search.naver.com/search.naver?ssc=tab.news.all&where=news&sm=tab_jum&query="
keyword=input("검색어를 입력하세요. 관련도순으로 10개의 기사가 엑셀 파일에 담깁니다.")
search_url=base_url+keyword
r=requests.get(search_url)

soup=BeautifulSoup(r.text, "html.parser")

titles=soup.select(".news_tit")
press=soup.select(".info.press")
contents=soup.select(".api_txt_lines.dsc_txt_wrap")

wb=Workbook()
ws=wb.active

ws.append(["언론사", "헤드라인", "내용"])

for (p, title, content) in zip(press, titles, contents):
    ws.append([p.text.strip(), title.text.strip(), content.text.strip()])
    
filename=f'./{keyword}.xlsx'
wb.save(filename)
