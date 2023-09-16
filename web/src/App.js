import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "@emotion/react";
import UserMovies from "./pages/Movies";
import LoginRegister from "./pages/LoginRegister";
import PrivateRoute from "./middlewares/PrivateRoute";
import { ADMIN_ROLE, USER_ROLE } from "./constants";
import Movies from "./pages/Admin/Movies";
import theme from "./config/customTheme";
import { CssBaseline } from "@mui/material";
import Users from "./pages/Admin/Users";
import Revenue from "./pages/Admin/Revenue";
import MovieDetail from "./pages/MovieDetail";
import PromotionDetail from "./pages/PromotionDetail";
import News from "./pages/News";
import NewsDetail from "./pages/NewsDetail";
import BookTicket from "./pages/BookTicket";
import BookTicketStepOne from "./pages/User/BookTicketStepOne";
import BookTicketStepTwo from "./pages/User/BookTicketStepTwo";
import Profile from "./pages/User/Profile";
import Cinema from "./pages/Cinema";
import Support from "./pages/Support";
import SearchResults from "./pages/SearchResults";
import Tickets from "./pages/Admin/Tickets";
import LoadingProvider from "./contexts/LoadingProvider";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Provider store={store}>
        <LoadingProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<DefaultLayout noRole={true} />}>
                <Route element={<HomePage />} path="/" />
                <Route element={<UserMovies />} path="/movies/:type" />
                <Route element={<LoginRegister />} path="/auth" />
                <Route element={<MovieDetail />} path="/movie/:movieId" />
                <Route
                  element={<PromotionDetail />}
                  path="/promotion/:promotionId"
                />
                <Route element={<News />} path="/news" />
                <Route element={<NewsDetail />} path="/news/:newsId" />
                <Route element={<BookTicket />} path="/book-ticket" />
                <Route element={<Cinema />} path="/cinema" />
                <Route element={<Support />} path="/support" />
                <Route
                  element={<SearchResults />}
                  path="/search-results/:searchKey"
                />
              </Route>
              <Route element={<DefaultLayout />}>
                <Route element={<PrivateRoute role={USER_ROLE} />}>
                  <Route
                    element={<BookTicketStepOne />}
                    path="/book-ticket/step-1"
                  />
                  <Route
                    element={<BookTicketStepTwo />}
                    path="/book-ticket/step-2"
                  />
                  <Route element={<Profile />} path="/profile/:userId/:type" />
                </Route>
                <Route element={<PrivateRoute role={ADMIN_ROLE} />}>
                  <Route element={<Movies />} path="/admin/movies" />
                  <Route element={<Users />} path="/admin/users" />
                  <Route element={<Revenue />} path="/admin/revenue" />
                  <Route element={<Tickets />} path="/admin/tickets" />
                </Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </LoadingProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
