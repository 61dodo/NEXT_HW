low=1
high=int(input("숫자 게임 최대값을 입력해주세요: "))
print("1부터 ", high,"까지의 숫자를 하나 생각하세요.")
input("준비가 되었으면 Enter를 누르세요.")
mid=int((low+high)/2)
print("당신이 생각한 숫자는 ",mid, "입니까?")

cnt=0
while True:
  a=input("제가 맞췄다면 '맞음', 제가 제시한 숫자보다 크다면 '큼', 작다면 '작음'을 입력해주세요: ")
  if a=='맞음':
    cnt=cnt+1
    print(cnt,"번 만에 맞췄다")
    break
  elif a=='큼':
    cnt=cnt+1
    low=mid
    mid=int((low+high)/2)
    print("당신이 생각한 숫자는 ", mid,"입니까?")
    continue
  elif a=='작음':
    cnt=cnt+1
    high=mid
    mid=int((low+high)/2)
    print("당신이 생각한 숫자는 ", mid,"입니까?")
    continue
  else:
    print("다시 입력해주세요")
    continue