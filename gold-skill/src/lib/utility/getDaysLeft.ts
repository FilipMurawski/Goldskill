function getDaysLeft(startDate: Date | undefined, period: number | undefined): number | string {
    if (!startDate ||!period) return 0;
    if (period === 999) {return "nieskończoność"} 
    const start = new Date(startDate);
    const expiryDate = new Date(start);
    expiryDate.setDate(expiryDate.getDate() + period); 

    const today = new Date();
    const diffTime = expiryDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

    return diffDays > 0 ? diffDays : 0;
}

export default getDaysLeft;
