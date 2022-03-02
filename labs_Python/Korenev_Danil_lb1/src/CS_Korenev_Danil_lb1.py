import wikipedia as wiki

def is_page_valid(page):
    try:
        wiki.page(page)
    except Exception:
        return False
    return True

def is_language_valid(lang):
    if lang in wiki.languages():
        return True
    else:
        return False

def max_word(arr):
    maximum, answer_title = 0, ""
    for title in arr:
        page = wiki.page(title)
        count_word = len(page.summary.split())
        if count_word >= maximum:
            maximum, answer_title = count_word, page.title
    return [maximum, answer_title]

def chain(arr):
    chain = []
    for index_page in range(len(arr)-1):
        chain.append(arr[index_page])
        page = wiki.page(arr[index_page])
        if (arr[index_page+1]) not in page.links:
            for link in page.links:
                if is_page_valid(link):
                    link_page = wiki.page(link) # вики объект страницы в ссылках
                    if arr[index_page+1] in link_page.links:
                        chain.append(link)
                        break
    chain.append(arr[-1])
    return chain

name_pages = input().split(", ")  # вход строки
lang = name_pages.pop()  # отделяем язык


if (is_language_valid(lang)):
    wiki.set_lang(lang)
    true_pages = []
    for i in name_pages:
        if is_page_valid(i):
            true_pages.append(i)
    max_ans = max_word(true_pages)
    print(max_ans[0], max_ans[1])
    print(chain(true_pages))
else:
    print("no results")
