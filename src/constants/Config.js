import {Platform} from 'react-native';

export const PLACEHOLDER_IMAGE_COMP = require('../../assets/images/LogoBlack.png');

const Config = {
  // Strip_PK:
  //   'pk_test_51LMm3HIrDDSW9ldIUDvQk0QlcEsjLfojPBOTyfUP34Lkm5Au23GTUfKecCrf7uPlNo8gRC9dwFhXrTPe4DCG3qsq00jpxFNzPf',
  // Strip_SK:
  // 'sk_test_51LMm3HIrDDSW9ldIE0xbf7iGST6kcrNeiIA4XLazdR6xH3QmMDLIlKgvGTx5GwtMmFWxUa8NGMxeVnqznzYnMV0p00VwG729Se',

  Strip_PK:
    'pk_test_51KloP1EhFW4LgI7esw2m5Y2hJHJjYSungM2G479QEZEL8o4J81HmyDcPgzhxvymRawLtVc1iLK1UIu9O81g8lVW800mmD4zv5m',
  Strip_SK:
    'sk_test_51KloP1EhFW4LgI7e8KaFFkd8k0Hsi1FvNH6zSWzhQjdxHQ0ekcSzrYBbwocCOLDX7KYcjMItp3ioXVJuSinGhlRs006XkJKKjQ',

  BASE_URL: 'https://dev.indiit.solutions/pace/public/api',
  IMAGE_BASE_URL: 'https://dev.indiit.solutions/pace/public/assets/images/',
  VIDEO_BASE_URL: 'https://dev.indiit.solutions/pace/public/assets/videos/',

  PLACEHOLDER_IMAGE: 'https://picsum.photos/id/321/200/300',

  STRIP_BASE_URL: 'https://api.stripe.com/v1',

  strip_create_customers: '/customers',
  strip_create_payment_intents: '/payment_intents',

  reward_coin_value: 0.2,

  do_login: '/do_login',
  do_signup: '/do_signup',
  verify_id: '/verify_id',
  forget_password: '/forget-password',
  verify_otp: '/verify-otp',
  update_password: '/update-password',
  contact_support: '/contact-support',
  user_details: '/user-details',
  account: '/account',
  personal_data: '/personal-data',
  organizations: '/organizations',
  update_govt_id: '/update-govt-id',
  address_lists: '/address-lists',
  add_address: '/add-address',
  delete_address: '/delete-address',
  countries: '/countries',
  update_address: '/update-address',
  set_default_address: '/set-default-address',
  blog_details: '/blog-details',
  single_blog: '/single-blog',
  shop_category: '/get-categories',
  faqs_questions: '/faqs-questions',
  faqs: '/faqs',
  workouts: '/workouts',
  single_workout_detail: '/single-workout-detail',
  start_workout: '/start-workout',
  insert_cart: '/insert-cart',
  cart: '/cart',
  remove_product: '/remove-product',
  single_product: '/single-product',
  getAllProducts: '/products',
  water_glass: '/water-glass',
  add_water_glass: '/add-water-glass',
  remove_water_glass: '/remove-water-glass',
  fill_water_glass: '/fill-water-glass',
  edit_product_cart: '/edit-product-cart',
  earned_coins: '/earned-coins',
  contact_email: '/contact-email',
  all_payment_cards: '/payment-card',
  add_payment_cards: '/payment-card',
  set_deault_payment_cards: '/payment-card/default',
  edit_payment_cards: '/edit-payment-cards',
  delete_payment_card: '/payment-card/delete',
  home: '/home',
  update_profile_image: '/update-profile-image',
  viewed_workouts_video: '/viewed-workouts-video',
  completed_steps: '/completed-steps',
  get_step_process: '/get-step-process',
  step_process: '/step-process',
  update_product_cart: '/update-product-cart',
  fetch_products: '/fetch-products',
  get_milestone: '/get-milestone',
  start_milestone: '/start-milestone',
  show_milestone: '/show-milestone',
  user_walking_status: '/user-walking-status',
  user_running_status: '/user-running-status',
  user_running: '/user-running',
  user_walking: '/user-walking',
  checkout: '/checkout',
  progress: '/progress',
  social_login: '/social_login',
  wallet: '/wallet',
  order: '/order',
  workout_status: '/workout-status',
  logout: '/logout',
};

export const SUCCESS = 'success';
export const FAILURE = 'failure';

export default Config;
