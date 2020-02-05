# Programowanie w internecie - Projekt
## Sprawozdanie

### Częśc serwerowa
#### Wykorzystanie bazy danych
Projekt wykorzystuje Bazę danych MySQL. Obsługa z wykorzystaniem funkcji `mysqli`.
Wykorzystanie zapytań:

`INSERT` - Wypełnianie bazy losowo wygenerowanymi przykładowymi danymi:

`"INSERT INTO clients (id, first_name, last_name, phone, email) VALUES ('".$i."', '".$first_name."', '".$last_name."', '".$phone."', '".$email."')"`

`SELECT` - Pobieranie danych z bazy w celu ich wyświetlenia zawartości tabeli:

`"SELECT * FROM ".$table.";"`

`DELETE` - Usuwanie wybranego wypisu z tabeli:

`"DELETE FROM ".$table." WHERE id=".$id.";"`

`UPDATE` - Zmiana zawartości wybranego wpisu w tabeli

`"UPDATE ".$table." SET first_name = 'REDACTED', last_name = 'REDACTED' WHERE id=".$id.";"`

`Złożone zapytanie` - Złożone zapytanie z wykorzystaniem JOIN i WHERE

`"SELECT clients.first_name, clients.last_name, orders.cost, orders.id FROM clients INNER JOIN orders ON orders.client_id=clients.id WHERE clients.id='".$id."';"`

#### Zabezpieczenie serwisu

W celu zabezpieczenia serwisu oraz bazy danych stosowana jest sanityzacja wprowadzanych danych np: `$table = mysqli_real_escape_string($connection, $table);`, zabezpieczenie metod przez weryfikacje użytkownika (czy jest zalogowany i czy ma uprawnienia).

```
if(isset($_SESSION['user_id'])) {
    $query = "SELECT * FROM users WHERE id='".$_SESSION['user_id']."' LIMIT 1;";
    $result = $connection->query($query);
    if(!$result) {
     return $this->redirect('/');
    }
    .
    .
    .
```
Logowanie wykorzystuje solenie haseł:
Przy tworzeniu uzytkowniak:
```
$salt = substr(md5(rand(10000,99999)), 0, 22);

$pass_hash = password_hash($password, PASSWORD_BCRYPT, array(
    'cost' => 12,
    'salt' => $salt
));
```
Oraz przy logowani:
```
if(password_verify($password, $pass_hash)) {
    .
    .
    .
```

#### Sesja
Mechanizm sesji został wykorzystany przy uwierzytelnianiu uzytkowników.
```
if(isset($_SESSION['user_id'])) {
    $query = "SELECT * FROM users WHERE id='".$_SESSION['user_id']."' LIMIT 1;";
        .
        .
        .
```
#### Ciasteczka
Ciasteczka są wykorzystywane w celu przetrzymywania wybranego motywu strony (CSS). Do odczytywania i zapisywania ciasteczek zostały stworzone osobne funkcje mające na celu ułatwić ten proces:
[cookie.js](./public/js/cookie.js)

#### Różne typy dokumentów
Serwer generuje dynamicznie 3 typy dokumentów: HTML, JSON i Plaintext

JSON: wszystkie linki rozpoczynające się od `/api/`

Plaintext: endpoint pod adresem `/allclientinfo/{id}`

HTML: Wszystkie inne linki

#### Dwie wersje kolorystyczne strony
Jasny i ciemny theme strony zmieniany za pomocą JavaScript (bez potrzeby przeładowywania strony). Wybrany theme zostaje zapamiętany przy użyciu ciasteczek.

#### Wykorzystanie wzorca MVC
Szkielet strony został stworzony z wykorzystaniem frameworka Symfony 5 (dokładniej minimalnej wersji symfony/skeleton z doinstalowanymi tylko niezbędnymi bundlami jak annotation Routing czy Twig). Wykorzystanie Sf5 pozwala w łatwy sposób oddzielić od siebie widok (`Twig`), kontrolery ([AppController.php](./src/Controller/AppController.php)) i model bazy danych.

### Częśc kliencka
#### Formatowanie wykorzystujące CSS
Strona jest stylowana z wykorzystaniem CSS. Poza podstawowymi stylami zostały stworzone 2 pliki podłączane w zależnosci od wyboru przez uzytkownika jasnej albo ciemnej kolorystyki strony.
#### Układ zdefiniowany przez CSS
Układ elementów na stronie jest zdefiniowany z wykorzystaniem CSS. Układ strony wykorzystuje `grid`:

```
.grid-row {
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	grid-template-rows: 1fr;
	grid-column-gap: 3px;
	grid-row-gap: 3px;
	margin-bottom: 3px;
}

.grid-item {
	padding: 20px;
	font-size: 30px;
	text-align: center;
}

.grid-item-1 {
	grid-column-end: span 1;
    grid-column-start: auto;
}

.grid-item-2 {
	grid-column-end: span 2;
    grid-column-start: auto;
}
    .
    .
    .
```
#### Wykorzystanie jezyka JavaScript
Duża częśc strony odpowiedzialna za zarządzanie bazą danych jest zrobiona w założeniu `one-page website` w którym wszelkie zmiany nie wymagają przeładowywania strony. Komunikacja z backendem jest wykonywana z pomocą AJAX'a przez API, JavaScript ingeruje w drzewo DOM zmieniając wyświetlane elementy. 
Łączna wielkośc kodu JS w projekcie to 482 linijki.
#### Wykorzystanie JS do modyfikacji drzewa DOM
Kod JavaScript po wywołaniu zapytań do API w zależności od odpowiedzi w odpowiedni sposób modyfikuje drzewo DOM w celu wyświetlenia danych.
```
var li = document.createElement("li");
var a = document.createElement('a');
a.href="#";
a.className="js-table";
a.dataset.table = table;
a.onclick = function() {
    .
    .
    .
};
var atext = document.createTextNode(table);
a.appendChild(atext);
li.appendChild(a);
document.getElementById("tablesList").appendChild(li);
```
#### AJAX
Projekt wykorzystuje AJAX w celu komunikacji z serwerem. Dla ułatwienia użycia AJAX'a zostały stworzone odpowiednie funkcje: [ajax.js](./public/js/ajax.js)

#### Strona nie rózni się znacznie na różnych przeglądarkach
Testowane na Google Chrome i Firefox na systemie Linux oraz IE na Win8

#### Walidacja CSS
Arkusze stylów CSS walidują się

#### Walidacja HTML 
HTML na stronie waliduje się