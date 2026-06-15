# Produty — ToDo Task Manager 📋

> Projekt zaliczeniowy — Zaawansowane Interfejsy Użytkownika (ZIU)  
> **Patryk Kindra** | Rok akademicki 2025/2026

---

## 🚀 Demo

> **Link do demo:** [https://patryk115.github.io/36375-ziu-todo-app-labs/]([https://patryk115.github.io/36375-ziu-todo-app-labs/](https://patryk115.github.io/36375-ziu-todo-app-labs/login))

---

## 📝 Opis projektu

**Produty** to nowoczesna aplikacja webowa do zarządzania zadaniami (Task Manager / ToDo), zbudowana w React + TypeScript + Material UI. Pozwala użytkownikom organizować codzienne zadania w projekty, śledzić postępy i zwiększać produktywność.

### Główne funkcje:
- 🔐 Rejestracja i logowanie (wielokrokowy formularz z walidacją)
- 📁 Zarządzanie projektami (CRUD)
- ✅ Zarządzanie zadaniami (dodawanie, usuwanie, oznaczanie jako ukończone)
- 📊 Dashboard z statystykami i profilem użytkownika
- 🌙 Dark/Light Mode z persystencją
- 📱 Responsywny design (mobile, tablet, desktop)
- ♿ Dostępność WCAG 2.1 AA

---

## 🛠️ Użyte technologie

| Technologia | Wersja | Cel |
|---|---|---|
| **React** | 18.x | Biblioteka UI |
| **TypeScript** | 5.x | Typowanie statyczne |
| **Vite** | 5.x | Bundler / dev server |
| **MUI (Material UI)** | 7.x | Biblioteka komponentów |
| **React Router DOM** | 7.x | Routing SPA |
| **React Hook Form** | 7.x | Zarządzanie formularzami |
| **Zod** | 4.x | Walidacja schematów |
| **Framer Motion** | 11.x | Animacje i przejścia |
| **Tailwind CSS** | 3.x | Klasy utility (w formularzach rejestracji) |

### Mock API
Aplikacja korzysta z własnego mock API (`localStorage`) symulującego operacje sieciowe z opóźnieniem 600-800ms, co pozwala na testowanie stanów `loading`, `success` i `error`.

---

## 📦 Instrukcja uruchomienia

### Wymagania
- Node.js >= 18.x
- npm >= 9.x

### Kroki

```bash
# 1. Sklonuj repozytorium
git clone https://github.com/[twoj-nick]/produty-todo-app.git
cd produty-todo-app

# 2. Zainstaluj zależności
npm install

# 3. Uruchom serwer deweloperski
npm run dev

# 4. Otwórz przeglądarkę
# http://localhost:5173
```

### Budowanie produkcji i Deployment (GitHub Pages)

Aplikacja jest skonfigurowana do łatwego wdrożenia na GitHub Pages. Wystarczy uruchomić jedną komendę:

```bash
# Upewnij się, że wszystkie zmiany są zatwierdzone w repozytorium GitHub.
# Następnie uruchom:
npm run deploy
```

Powyższe polecenie zbuduje wersję produkcyjną i opublikuje ją na gałęzi `gh-pages`. Twoja aplikacja będzie po kilku minutach dostępna pod adresem:
`https://patryk115.github.io/36375-ziu-todo-app-labs/`

*(Uwaga: w ustawieniach repozytorium na GitHubie w zakładce **Pages** upewnij się, że źródło to gałąź `gh-pages`)*.

---

## 🗂️ Struktura projektu

```
src/
├── api/                    # Mock API (localStorage)
│   ├── mockApi.ts          # CRUD dla zadań
│   └── projectApi.ts       # CRUD dla projektów
├── components/
│   ├── dashboard/          # AppHeader, DashboardLayout, StatsGrid...
│   ├── pages/              # ProjectsPage, ProjectDetailPage, ProfilePage
│   ├── registration/       # Wielokrokowy formularz rejestracji
│   └── ui/                 # PageTransition, GlobalSnackbar
├── context/                # AuthContext, TodoContext, ProjectContext, ThemeContext
├── reducers/               # todoReducer
├── theme/                  # createAppTheme (dark/light)
└── types/                  # todo.types, project.types
```

---

## 📱 Ekrany aplikacji

| Ścieżka | Opis |
|---|---|
| `/login` | Logowanie (RHF + Zod) |
| `/register` | Rejestracja 3-krokowa (RHF + Zod) |
| `/` | Dashboard — lista zadań + projekty |
| `/projects` | Lista projektów (CRUD) |
| `/projects/:id` | Zadania projektu |
| `/profile` | Profil użytkownika ze statystykami |
| `/settings` | Ustawienia konta (dark mode, powiadomienia) |

---

## ♿ Dostępność (WCAG 2.1 AA)

- ✅ Semantyczny HTML (header, main, footer, nav, section, article)
- ✅ Skip Link (pomiń nawigację) — widoczny przy fokusie
- ✅ aria-labels, aria-live, aria-describedby, aria-invalid na wszystkich polach formularzy
- ✅ role="alert" na komunikatach błędów
- ✅ Kontrast kolorów ≥ 4.5:1 (sprawdzony w Figmie i Chrome DevTools)
- ✅ Nawigacja klawiaturą + widoczny focus (outline: 2px solid #7C3AED)
- ✅ Responsywny design z dwoma breakpointami (mobile xs, desktop md)

---

## 🎨 Notatka UX — Design Decisions

### Grupa docelowa / Persona

**Persona: Student/Freelancer (22–30 lat)**
- Zarządza wieloma projektami jednocześnie (studia, praca, projekty poboczne)
- Używa komputera i telefonu
- Ceni estetykę i szybkość działania
- Lubi mieć poczucie kontroli nad zadaniami

### Kluczowe wybory UI/UX

#### 1. Dark Mode jako domyślny
Aplikacje do produktywności (Linear, Notion, Raycast) preferują ciemny motyw — redukuje zmęczenie wzroku podczas długich sesji pracy. Dodano przełącznik z persystencją w `localStorage`.

#### 2. Animacje Framer Motion
Zgodnie z heurystyką Nielsena **#1 (Widoczność statusu systemu)** — użytkownik zawsze wie, że akcja została wykonana. Animacje przejść między stronami (fade + slide) i listy zadań (AnimatePresence) zapewniają ciągłość kontekstu.

#### 3. Wielokrokowy formularz rejestracji
Zamiast długiego formularza, podział na 3 kroki zmniejsza "cognitive load" (obciążenie poznawcze) użytkownika. Pasek postępu wizualizuje stan procesu — heurystyka **#1** i **#7 (Elastyczność)**.

#### 4. Optimistic Updates + GlobalSnackbar
Zgodnie z heurystyką **#1** — feedback jest natychmiastowy (zadanie znika od razu z listy), a błąd sieciowy pojawia się jako Snackbar z możliwością odczytu. Zastąpiło to nieprzyjazny `alert()`.

#### 5. Karty projektów z paskiem postępu
Zamiast suchej listy — karty z kolorem projektu, ikoną i paskiem postępu dają szybki wgląd w stan projektu bez potrzeby wchodzenia w szczegóły. Heurystyka **#6 (Recognition over Recall)**.

#### 6. Kontrast i dostępność
Paleta kolorów: tekst `#F9FAFB` na tle `#0A0B10` = kontrast ~18:1 (AAA). Akcent fioletowy `#7C3AED` na ciemnym tle = kontrast ~7.5:1 (AA).

### Odniesienie do Heurystyk Nielsena

| # | Heurystyka | Implementacja |
|---|---|---|
| 1 | Widoczność statusu | Loading spinners, Snackbar sukcesu/błędu, Chip "Zapisywanie..." |
| 4 | Spójność i standardy | MUI Design System, konsekwentna paleta kolorów |
| 5 | Zapobieganie błędom | Walidacja Zod inline (onBlur), disabled button bez wypełnionego formularza |
| 6 | Recognition not recall | Ikony w nawigacji, kolory projektów, etykiety priorytetów |
| 7 | Elastyczność | Filter Bar (Wszystkie / Aktywne / Ukończone), skrót "Rozpocznij teraz" |
| 9 | Pomoc w diagnozie błędów | Konkretne komunikaty walidacji ("Hasło musi mieć co najmniej 8 znaków") |

---

## 📊 Spełnione kryteria zaliczenia

| Kryterium | Pkt | Status |
|---|---|---|
| Prototypowanie UI (Figma hi-fi) | 6 | ✅ |
| Implementacja interfejsu (komponenty, routing 5+ ekranów, MUI) | 7 | ✅ |
| Responsive Design (xs/md breakpoints, Drawer mobile) | 5 | ✅ |
| Formularze i walidacja (RHF + Zod, inline errors) | 5 | ✅ |
| Dostępność WCAG (semantic HTML, aria, kontrast, fokus) | 8 | ✅ |
| State Management (Context API, loading/success/error) | 4 | ✅ |
| Integracja z API (mock GET/POST/DELETE/PUT, błędy UI) | 5 | ✅ |
| Mikrointerakcje i animacje (Framer Motion, Snackbar) | 5 | ✅ |
| Deployment i dokumentacja (README, GitHub) | 5 | ✅ |
| **Razem** | **50** | ✅ |

---

## 📄 Licencja

MIT — projekt edukacyjny

---

*Produty v1.0.0 — Patryk Kindra © 2026*
