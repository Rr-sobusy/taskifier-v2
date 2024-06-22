"use client"

import React from 'react';
import { Next13ProgressBar } from 'next13-progressbar';

const TopLoaderProvider = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
            <Next13ProgressBar height="3px" color="#2563eb" options={{ showSpinner: false }} showOnShallow />
        </>
    );
};

export default TopLoaderProvider;