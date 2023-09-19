export function formatDate(date: any) {
    if (date) {
        return new Date(date).toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',

            hour: 'numeric',
            minute: 'numeric',
        });
    }

    return undefined;
}