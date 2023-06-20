# UserApp

### Общие сведения
Приложение с информационными карточками персонажей из Star Wars.
Используемое API - [Star Wars API](https://swapi.dev/documentation).
[Макет](https://www.figma.com/file/SHilmuqmNa4GXNUSJNUauv/StarWars?node-id=2%3A3&t=zcbcyVY0nFHuB6VJ-0) приложения.

Приложение содержит 2 страницы:
- Главная: страница содержит приветствие пользователя, навигационное меню , кнопку перехода к странице с карточками персонажей.
- Страница с карточками о персонажах.

Реализован фильтр по цвету глаз персонажей. Фильтрация происходит локально на фронте, среди ранее полученных данных с АПИ.
В карточке персонажа реализовано отображение цветных тэгов в зависимости от типа информации (год рождения, пол).
Иконка персонажа выводится в зависимости от его пола. При скролле реализована подгрузка карточек на страницу.
