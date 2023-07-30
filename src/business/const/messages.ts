export class Messages {
  // Auth
  public static readonly UserRegistered: string = 'User Registered';
  public static readonly UserLoggedIn: string = 'User Logged In';
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
  //public static UserAddedInvalid: string = "User added invalided";
  //public static UserDeletedInvalid: string = "User deleted invalided";
  //public static UserDeletedInvalid: string = "User updated invalided";
  public static readonly UserAdded: string = 'User Added';
  public static readonly UserDeleted: string = 'User Deleted';
  public static readonly UserUpdate: string = 'User Updated';
  public static readonly UserGetAll: string = 'User Get All';
  public static readonly UserGetById: string = 'User Get By Id';
  public static readonly UserGetByMail: string = 'User Get By Mail';
  public static readonly UserGetClaims: string = 'User Get Claims';

  // Link
  public static readonly WebsiteNotAccessedError: string =
    'Website not accessed error';
  public static readonly NoSuchHostExist: string =
    'No such host is known to exist';
  public static readonly UrlAlreadyExists: string = 'Url Already Exists';
}
