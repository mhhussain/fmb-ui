export default defineEventHandler((e) => {
    return {
        type: 'itsId',
        itsId: e.context.params.itsId,
        name: 'user 1',
    };
});