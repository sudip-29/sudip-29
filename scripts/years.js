export const availableYears = [2026, 2025, 2024, 2023, 2022];

export let selectedYear = new Date().getFullYear();

export function setSelectedYear(year) {
    selectedYear = year;
}