import { LoginDTO } from '../../DTO/ILoginDTO';
import axios from 'axios';

export class LoginUserCase {
  async execute(data: LoginDTO): Promise<string> {
    const { email, password } = data;
    const URL = 'https://supersapiensbackend.agu.gov.br/auth/ldap_get_token';

    const response = await axios.post(URL, {
      username: email,
      password: password,
    });
    return response.data.token;
  }
}
