import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import CategoryPage from "./pages/CategoryPage";
import WelcomeMessagePage from "./pages/WelcomeMessagePage";
import GuildPrefixPage from "./pages/GuildPrefixPage";
import { GuildContext } from "./utils/contexts/GuildContext";
import { PartialGuild } from "./utils/types";
import { BarLoader } from "react-spinners";
import { Spinner } from "./components/Spinner";
import { useFetchUser } from "./utils/hooks/useFetchUser";
import { AppBar } from "./components/AppBar";
import GuildAnalyticsPage from "./pages/GuildAnalyticsPage";
import GuildBansPage from "./pages/GuildBansPage";

// ToDos:
// 1. Create a Dashboard Layout component and add AppBar to it.
// 2. Create a AuthContext and Protected Route component and use it to check if the user is logged in.

function App() {
  const [guild, setGuild] = useState<PartialGuild>();
  const { user, loading, error } = useFetchUser();
  const updateGuild = (guild: PartialGuild) => setGuild(guild);

  if (loading)
    return (
      <Spinner>
        <BarLoader color="white"></BarLoader>
      </Spinner>
    );

  return (
    <GuildContext.Provider value={{ guild, updateGuild }}>
      {(user && !error) ? (
        <>
          <Routes>
            <Route path="/dashboard/*" element={<AppBar />} />
          </Routes>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/menu" element={<MenuPage />} />
            {/* <Route path="/dashboard" element={<HomePage />} /> */}
            <Route path="/dashboard/categories" element={<CategoryPage />} />
            <Route path="/dashboard/prefix" element={<GuildPrefixPage />} />
            <Route path="/dashboard/message" element={<WelcomeMessagePage />} />
            <Route
              path="/dashboard/analytics"
              element={<GuildAnalyticsPage />}
            />
            <Route path="/dashboard/bans" element={<GuildBansPage />} />
          </Routes>
        </>
      ) : (
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Routes>
      )}
    </GuildContext.Provider>
  );
}

export default App;
