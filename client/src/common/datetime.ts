export function formatDate(inputDate: string): string {
    const date = new Date(inputDate);
    
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const twelveHourFormatHours = hours % 12 || 12;
    
    return `${day}/${month}/${year}, ${twelveHourFormatHours}:${minutes}:${seconds} ${amOrPm}`;
}