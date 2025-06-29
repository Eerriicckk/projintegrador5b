
import StringMask from 'string-mask';
import { jwtDecode } from "jwt-decode";

export function formatNumber(valor) {
    var formatInteiro = new StringMask('#.##0,', { reverse: true });
    var formatDecimal = new StringMask('#0', { reverse: true });
    const inteiro = Math.trunc(Number(valor));
    const decimal = (Number(valor) - inteiro).toFixed(2);

    return formatInteiro.apply(inteiro) + formatDecimal.apply(decimal);
}

export function isTokenExpired(token) {
    let expired = false;
    try {
        const decodedToken = jwtDecode(token);
        if (new Date(decodedToken.exp * 1000) < new Date())
            expired = true;
    } catch (error) {
        expired = true;
    }
    return expired;
}

export function isAdminInToken(token) {
    try {
        const decodedToken = jwtDecode(token);
        if (new Date(decodedToken.exp * 1000) < new Date())
            return false;
        return decodedToken.tipo === 'ADMIN'
    } catch (error) {
        return false;
    }
}