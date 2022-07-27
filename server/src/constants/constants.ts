export const constants = {
    POSTGRES_DB: 'project_node',
    POSTGRES_USER:' viktor',
    POSTGRES_PASSWORD: 'root',
    POSTGRES_HOST: 'localhost',
    POSTGRES_PORT: 5432,
    AUTHORIZATION: 'Authorization',
    EMAIL_REGEXP: /^.+@[^@]+\.[^@]{2,}$/,
    PHONE_REGEXP: /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
    PHOTO_MAX_SIZE: 2 * 1024 * 1024,
    VIDEO_MAX_SIZE: 20 * 1024 * 1024,
    PHOTOS_MIMETYPES: [
        'image/gif', // .gif
        'image/jpeg', // .jpg, .jpeg
        'image/pjpeg', // .jpeg
        'image/png', // .png
        'image/webp', // .webp
    ],

    VIDEO_MIMETYPES: [
        'video/mp4',
        'video/x-msvideo',
    ],
};
