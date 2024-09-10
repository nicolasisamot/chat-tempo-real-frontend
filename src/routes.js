import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthContextProvider from "./contexts/AuthContext";
import Login from "./pages/Login/Login";
import Chat from "./pages/Chat/Chat";
import MainLayout from "./components/MainLayout/MainLayout";

export default function Rotas() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <h1>PAGINA INICIAL</h1>
              </MainLayout>
            }
          ></Route>
          <Route
            path="/chat"
            element={
              <MainLayout>
                <Chat />
              </MainLayout>
            }
          ></Route>
          <Route
            path="*"
            element={
              <MainLayout>
                <h1>ERROR 404</h1>
              </MainLayout>
            }
          ></Route>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
