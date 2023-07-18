export class Messages {
  // Auth
  public static readonly UserRegistered: string = 'User registered';
  public static readonly UserNotFound: string = 'User Not Found';
  public static readonly PasswordError: string = 'Password Error';
  public static readonly SuccessfulLogin: string = 'Success Login';
  public static readonly UserAlreadyExists: string = 'User Already Exists';
  public static readonly AccessTokenCreated: string = 'Access Token Created';
  public static readonly CreateNewPassword: string = 'Create New Password';
  public static readonly AuthorizationDenied: string =
    'You have no authorization';
  public static readonly NickNameAlreadyExists: string =
    'Nick Name Already Exists';
  public static readonly EmailAlreadyExists: string = 'Email Already Exists';

  // Total
  public static NullData = 'This data is Null';

  // UserReg
  /**User Alanı**/
  public static UserAdded = 'User added';
  //public static UserAddedInvalid: string = "User added invalided";
  public static UserDeleted = 'User deleted';
  //public static UserDeletedInvalid: string = "User deleted invalided";
  public static UserUpdate = 'User updated';
  //public static UserDeletedInvalid: string = "User updated invalided";

  // Link
  public static readonly WebsiteNotAccessedError: string =
    'Website not accessed error';
  public static readonly NoSuchHostExist: string =
    'No such host is known to exist';
  public static readonly UrlAlreadyExists: string = 'Url already exists';
}
