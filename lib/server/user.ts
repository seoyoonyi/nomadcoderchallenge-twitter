import bcrypt from "bcrypt";

export class User {
  private email: string;
  private password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }

  async encryptPassword(): Promise<void> {
    try {
      // bcrypt 라이브러리를 사용하여 패스워드를 암호화
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    } catch (err) {
      console.error("패스워드 암호화 실패:", err);
      throw err;
    }
  }

  async comparePasswords(plainPassword: string): Promise<boolean> {
    try {
      // bcrypt 라이브러리를 사용하여 입력한 패스워드와 저장된 패스워드를 비교
      const match = await bcrypt.compare(plainPassword, this.password);
      return match;
    } catch (err) {
      console.error("패스워드 비교 실패:", err);
      throw err;
    }
  }

  getPassword(): string {
    return this.password;
  }
}
