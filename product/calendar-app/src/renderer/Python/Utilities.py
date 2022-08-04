import feedparser


def get_rss_news_data(link):
    feed = feedparser.parse(link)
    entry = feed.entries
    titles = {}
    num = 0

    titles["Title"] = feed.feed.title
    for i in entry:

        if "description" in i and "published" in i:

            titles[str(num)] = {"title": i.title.replace("\"", ""),
                                "summary": i[u"description"].replace("\"", ""), "date": i.published.replace("\"", "")}
        num += 1

    return titles
