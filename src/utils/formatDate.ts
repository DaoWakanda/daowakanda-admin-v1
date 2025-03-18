export function formatDate(inputDate: string) {
    const date = new Date(inputDate);

    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'long' });
    const year = date.getFullYear();

    // Function to add "st", "nd", "rd", or "th" to the day
    function getDayWithOrdinal(n: number) {
        const s = ['th', 'st', 'nd', 'rd'];
        const v = n % 100;
        return n + (s[(v - 20) % 10] || s[v] || s[0]);
    }

    const formattedDate = `${getDayWithOrdinal(day)} ${month}, ${year}`;
    return formattedDate;
}
