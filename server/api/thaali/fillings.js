export default defineEventHandler((e) => {
    return $fetch('https://test-thaali-api.herokuapp.com/api/db/WeeklyMenu');
});