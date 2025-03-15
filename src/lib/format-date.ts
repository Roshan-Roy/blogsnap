const formatDate = (date: Date): string => {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
        return "Invalid Date"; // Handle invalid Date objects
    }

    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-GB', options).replace(',', '');
}

export default formatDate