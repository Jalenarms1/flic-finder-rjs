import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import MainPage from './pages/MainPage';
import SavedMovies from "./pages/SavedMovies";
import './App.css';

export default function App() {

    return (
        
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/saved-movies" element={<SavedMovies />} />
            </Routes>
        </BrowserRouter>

        
    )

}