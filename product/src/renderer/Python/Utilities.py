from rss_parser import Parser
from requests import get
# import requests
# from bs4 import BeautifulSoup


def get_rss_news_data(link):
    try:
        titles = []
        xml = get(link)

        parser = Parser(xml=xml.content)

        feed = parser.parse()

        num = 0
        titles.append(feed.title)
        for i in feed.feed:
            title = i.title.replace("\"", "")
            title = title.replace("\'", "")
            str_title = title.encode("ascii", "ignore")
            str_1title = str_title.decode()
            summary = i.description.replace("\"", "")
            summary = summary.replace("\'", "")
            str_summary = summary.encode("ascii", "ignore")
            str_1summary = str_summary.decode()
            date = i.publish_date.replace("\"", "")
            date = date.replace("\'", "")
            str_date = date.encode("ascii", "ignore")
            str_1date = str_date.decode()
            # if "description" in i and "published" in i and "title" in i:
            titles.append[str_1title, str_1summary, str_1date]
            if(num > 25):
                break
            num += 1
        return titles
    except Exception as e:
        print(e)
