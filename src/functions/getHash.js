export default function getHash() {
    // eslint-disable-next-line no-sequences
    const getQueryParams = () => window.location.search
    .replace('?', '')
    .split('&')
    .map(item => {
        const data = item.split('=');
        if (data.length && data[0] === 'hash') {
            return {hash: data[1]}
        }
        return {};
    });

    const queryData = getQueryParams();

    return queryData.length && Object.keys(queryData[0]).includes('hash') ? queryData[0]['hash'] : null;
}