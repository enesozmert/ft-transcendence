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
  public static readonly UserGetByNickName: string = 'User Get By NickName';
  public static readonly UserGetAttributes: string = 'User Get By Attributes';
  public static readonly UserGetClaims: string = 'User Get Claims';
  public static readonly UserGetStatus: string = 'User Get Status';

  // Link
  public static readonly WebsiteNotAccessedError: string =
    'Website not accessed error';
  public static readonly NoSuchHostExist: string =
    'No such host is known to exist';
  public static readonly UrlAlreadyExists: string = 'Url Already Exists';

  //GameHistory
  public static readonly GameHistoryAdded: string = 'GameHistory Added';
  public static readonly GameHistoryDeleted: string = 'GameHistory Deleted';
  public static readonly GameHistoryUpdate: string = 'GameHistory Updated';
  public static readonly GameHistoryGetAll: string = 'GameHistory Get All';
  public static readonly GameHistoryGetById: string = 'GameHistory Get By Id';
  public static readonly GameHistoryNotFound: string = 'GameHistory Not Found';

  //GameResultName
  public static readonly GameResultNameAdded: string = 'GameResultName Added';
  public static readonly GameResultNameDeleted: string = 'GameResultName Deleted';
  public static readonly GameResultNameUpdate: string = 'GameResultName Updated';
  public static readonly GameResultNameGetAll: string = 'GameResultName Get All';
  public static readonly GameResultNameGetById: string = 'GameResultName Get By Id';
  public static readonly GameResultNameNotFound: string = 'GameResultName Not Found';

  //GameResultName
  public static readonly GameScoreAdded: string = 'GameScore Added';
  public static readonly GameScoreDeleted: string = 'GameScore Deleted';
  public static readonly GameScoreUpdate: string = 'GameScore Updated';
  public static readonly GameScoreGetAll: string = 'GameScore Get All';
  public static readonly GameScoreGetById: string = 'GameScore Get By Id';
  public static readonly GameScoreNotFound: string = 'GameScore Not Found';
}
