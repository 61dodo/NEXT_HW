import time
import csv
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import NoSuchElementException

chromedriver_path="C:/Users/moon/Desktop/chromedriver-win64/chromedriver.exe"
user_data_dir = "C:/Users/moon/Desktop/NEXT/HW/NEXT_HW_6/새 폴더"

chrome_options=Options()
chrome_options.add_argument(f"user-data-dir={user_data_dir}")
service=Service(executable_path=chromedriver_path)

driver=webdriver.Chrome(service=service, options=chrome_options)

driver.get('https://library.korea.ac.kr/datause/collection/pop/total/')

fieldbtn=driver.find_element(By.XPATH, '//*[@id="post-2366"]/header/ul/li[5]/a')
fieldbtn.click()
time.sleep(3)

# CSV 파일에 저장할 데이터
data = []

def remove_book_loan(title):
    return title.rsplit('(', 1)[0].strip()  # '(' 기준으로 문자열을 나누고, 첫 번째 요소를 반환

for i in range(1,13):
  title=driver.find_element(By.XPATH, f'//*[@id="post-699"]/div/div[2]/div/div[2]/div/div[{i}]/div/div[2]/div[1]/h4/a').text
  title=remove_book_loan(title)
  author=driver.find_element(By.XPATH, f'//*[@id="post-699"]/div/div[2]/div/div[2]/div/div[{i}]/div/div[2]/div[2]').text
  publisher=driver.find_element(By.XPATH, f'//*[@id="post-699"]/div/div[2]/div/div[2]/div/div[1]/div/div[2]/div[3]').text.strip()[:-6]
  data.append([title, author, publisher])

nextbtn=driver.find_element(By.XPATH, '//*[@id="post-699"]/div/div[2]/div/div[3]/a')
nextbtn.click()
time.sleep(3)
  
while True:
    for i in range(1, 13):
        title_xpath = f'//*[@id="post-699"]/div/div[2]/div/div[2]/div/div[{i}]/div/div[2]/div[1]/h4/a'
        author_xpath = f'//*[@id="post-699"]/div/div[2]/div/div[2]/div/div[{i}]/div/div[2]/div[2]'
        publisher_xpath=f'//*[@id="post-699"]/div/div[2]/div/div[2]/div/div[{i}]/div/div[2]/div[3]'
        try:
            title = driver.find_element(By.XPATH, title_xpath).text
            title=remove_book_loan(title)
            author = driver.find_element(By.XPATH, author_xpath).text
            publisher = driver.find_element(By.XPATH, publisher_xpath).text.strip()[:-6]
            data.append([title, author, publisher])
        except NoSuchElementException:
            # 해당 페이지에 더 이상 요소가 없는 경우
            break

    try:
        nextbtn = driver.find_element(By.XPATH, '//*[@id="post-699"]/div/div[2]/div/div[3]/a[2]')
        nextbtn.click()
        time.sleep(3)
    except NoSuchElementException:
        # 다음 페이지 버튼이 더 이상 없는 경우
        break
  
# CSV 파일에 데이터 쓰기
csv_filename = "final2.csv"
with open(csv_filename, "w", newline="", encoding="utf-8-sig") as csvfile:
    csv_writer = csv.writer(csvfile)
    csv_writer.writerow(["Title", "Author", "Publisher"])  # 헤더 쓰기
    csv_writer.writerows(data)  # 데이터 쓰기

print(f"Data saved to {csv_filename}")