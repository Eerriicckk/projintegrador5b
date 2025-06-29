import React from 'react'
import { useLocation } from 'react-router';

export const useHome = () => {
}


export function useQuery() {
    return new URLSearchParams(useLocation().search);
}