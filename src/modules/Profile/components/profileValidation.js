import memoize from 'lru-memoize';
import { createValidator, email, match } from 'utils/validation';

const profileValidation = createValidator({
  email: [email],
  confirmEmail: [email, match('email')],
});
export default memoize(10)(profileValidation);
