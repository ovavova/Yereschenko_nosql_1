## Частина 1

### Результат виконання 02_DATA_TRANSFORM.mongodb.js по трансформації даних:
![image alt](https://github.com/ovavova/Yereschenko_nosql_1/blob/main/MongoDB01.png)

### 1. Чому аудіо-характеристики винесені в окремий об’єкт audio_features, а не зберігаються плоско? Коли таке вкладення вигідне, а коли створює проблеми?

- Швидше робити вибірку по цим фічам. Компактніше обрати всі разом аудіофічі - db.tracks.find({}, {audio_features: 1} для аналізу ніж перелічувати

### 2 . Чому виконавці зберігаються як масив, а не як рядок? Які запити стають простішими?

- Легше стає знайти всі пісни і аналізувати одного артиста - db.tracks.find({artists: "..."}). MongoDB автоматично перевіряє кожен елемент масиву. 

### 3. Що таке $out і чим він відрізняється від $merge? Коли використовувати кожен?

- $out знищує існуючу цільову колекцію і створює її наново з результатами агрегації.
- $merge Дозволяє додавати upsert та оновлювати існуючі документи. Працює на основі унікального ідентифікатора (track_id).

## Частина 2 Queries 

### Завдання 1. Треки для вечірки

![image alt](https://github.com/ovavova/Yereschenko_nosql_1/blob/main/MongoDB2_1.png)

### Завдання 2. Виконавці, у яких усі треки популярні
![image alt](https://github.com/ovavova/Yereschenko_nosql_1/blob/main/MongoDB2_2.png)

### Завдання 3. Нетипові треки
![image alt](https://github.com/ovavova/Yereschenko_nosql_1/blob/main/NoSQL_2_2.png)


### Завдання 4: Треки для фонової роботи

Знайдіть треки, які підходять для фонового прослуховування під час роботи: тихі (loudness < -10), з низькою мовленнєвою складовою (speechiness < 0,1), переважно інструментальні (instrumentalness > 0,5) і не містять explicit-контенту.
![image alt](https://github.com/ovavova/Yereschenko_nosql_1/blob/main/MongoDB2_4.png)

