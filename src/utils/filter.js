export default {
    async ft_object(kriteria, data, ignored) {
        // filter data by kriteria
        const filteredData = await data.filter(item => {
            return Object.keys(kriteria).every(key => {
                if (!kriteria[key]?.length) {
                    return true;
                }
                return kriteria[key]?.includes(item[key]);
            });
        });
        return filteredData
    }
}