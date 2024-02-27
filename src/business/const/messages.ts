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

  //Chat
  public static readonly ChatRoomPropertyAdded: string = 'ChatRoomProperty Added';
  public static readonly ChatRoomPropertyDeleted: string = 'ChatRoomProperty Deleted';
  public static readonly ChatRoomPropertyUpdate: string = 'ChatRoomProperty Updated';
  public static readonly ChatRoomPropertyGetAll: string = 'ChatRoomProperty Get All';
  public static readonly ChatRoomPropertyGetById: string = 'ChatRoomProperty Get By Id';
  public static readonly ChatRoomPropertyNotFound: string = 'ChatRoomProperty Not Found';

  public static readonly ChatRoomTypeAdded: string = 'ChatRoomType Added';
  public static readonly ChatRoomTypeDeleted: string = 'ChatRoomType Deleted';
  public static readonly ChatRoomTypeUpdate: string = 'ChatRoomType Updated';
  public static readonly ChatRoomTypeGetAll: string = 'ChatRoomType Get All';
  public static readonly ChatRoomTypeGetById: string = 'ChatRoomType Get By Id';
  public static readonly ChatRoomTypeNotFound: string = 'ChatRoomType Not Found';

  public static readonly ChatRoomUserAdded: string = 'ChatRoomUser Added';
  public static readonly ChatRoomUserDeleted: string = 'ChatRoomUser Deleted';
  public static readonly ChatRoomUserUpdate: string = 'ChatRoomUser Updated';
  public static readonly ChatRoomUserGetAll: string = 'ChatRoomUser Get All';
  public static readonly ChatRoomUserGetById: string = 'ChatRoomUser Get By Id';
  public static readonly ChatRoomUserNotFound: string = 'ChatRoomUser Not Found';
  public static readonly ChatRoomUserFound: string = 'ChatRoomUser Found';

  public static readonly ChatRoomUserPropertyAdded: string = 'ChatRoomUserProperty Added';
  public static readonly ChatRoomUserPropertyDeleted: string = 'ChatRoomUserProperty Deleted';
  public static readonly ChatRoomUserPropertyUpdate: string = 'ChatRoomUserProperty Updated';
  public static readonly ChatRoomUserPropertyGetAll: string = 'ChatRoomUserProperty Get All';
  public static readonly ChatRoomUserPropertyGetById: string = 'ChatRoomUserProperty Get By Id';
  public static readonly ChatRoomUserPropertyNotFound: string = 'ChatRoomUserProperty Not Found';

  public static readonly DirectMessageMatchAdded: string = 'DirectMessageMatch Added';
  public static readonly DirectMessageMatchDeleted: string = 'DirectMessageMatch Deleted';
  public static readonly DirectMessageMatchUpdate: string = 'DirectMessageMatch Updated';
  public static readonly DirectMessageMatchGetAll: string = 'DirectMessageMatch Get All';
  public static readonly DirectMessageMatchGetById: string = 'DirectMessageMatch Get By Id';
  public static readonly DirectMessageMatchNotFound: string = 'DirectMessageMatch Not Found';

  public static readonly ChatRoomGetAll: string;
  public static readonly ChatRoomGetById: string;
  public static readonly ChatRoomAdded: string;
  public static readonly ChatRoomNotFound: string;
  public static readonly ChatRoomUpdate: string;

  public static readonly GetRoomsByUserDto: string;

  public static readonly ChatRoomGetByAccessId: string;
  public static readonly ChatRoomUserGetByAccessId: string;

  public static readonly OperationClaimGetAll: string;
  public static readonly OperationClaimGetById: string;
  public static readonly OperationClaimAdded: string;
  public static readonly OperationClaimNotFound: string;
  public static readonly OperationClaimUpdate: string;
  public static readonly OperationClaimDeleted: string;

  public static readonly UserOperationClaimGetAll: string;
  public static readonly UserOperationClaimGetById: string;
  public static readonly UserOperationClaimAdded: string;
  public static readonly UserOperationClaimNotFound: string;
  public static readonly UserOperationClaimUpdate: string;
  public static readonly UserOperationClaimDeleted: string;

  public static readonly GameScoreGetByUserIdGameScoreDto: string;

  public static readonly UserInfoGetAll: string;
  public static readonly UserInfoGetById: string;
  public static readonly UserInfoAdded: string;
  public static readonly UserInfoNotFound: any;
  public static readonly UserInfoGetByNickName: string;
  public static readonly UserInfoUploadProfileImage: string;

  public static readonly GameTotalScoreGetAll: string;
  public static readonly GameTotalScoreGetById: string;
  public static readonly GameTotalScoreAdded: string;
  public static readonly GameTotalScoreNotFound: string;
  public static readonly GameTotalScoreUpdate: string;
  public static readonly GameTotalScoreDeleted: string;

  public static readonly TwoFATypeGetAll: string;
  public static readonly TwoFATypeGetById: string;
  public static readonly TwoFATypeAdded: string;
  public static readonly TwoFATypeNotFound: string;
  public static readonly TwoFATypeUpdate: string;
  public static readonly TwoFATypeDeleted: string;

  public static readonly GetWithUserDtos: string;
  public static readonly AchievementUpdate: string;
  public static readonly AchievementNotFound: string;
  public static readonly AchievementAdded: string;
  public static readonly AchievementGetById: string;
  public static readonly AchievementGetAll: string;
  public static readonly AchievementDeleted: string;

  public static readonly AchievementRuleDeleted: string;
  public static readonly AchievementRuleNotFound: string;
  public static readonly AchievementRuleAdded: string;
  public static readonly AchievementRuleGetAll: string;

  public static readonly UserAchievementUpdate: string;
  public static readonly UserAchievementDeleted: string;
  public static readonly UserAchievementNotFound: string;
  public static readonly UserAchievementAdded: string;
  public static readonly UserAchievementGetById: string;
  public static readonly UserAchievementGetAll: string;

  public static readonly CheckedAchievement: string;
  public static readonly CheckedAchievementNotFound: string;
  public static readonly UserAchievementUserIdAndAchievementId: string;
  public static readonly UserBlockGetAll: string;
  public static readonly UserBlockGetById: string;
  public static readonly UserBlockNotFound: any;
  public static readonly UserBlockAdded: any;
  public static readonly UserBlockByBlockerId: string;
  public static readonly DirectMessageGetAll: string;
  public static readonly DirectMessageGetById: string;
  public static readonly DirectMessageNotFound: string;
  public static readonly DirectMessageAdded: string;
  public static readonly DirectMessageUpdate: any;
  public static readonly DirectMessageDeleted: string;
  public static readonly DirectMessageGetAllByUserId: string;

  public static readonly UserTwoFAGetAll: string;
  public static readonly UserTwoFAGetById: string;
  public static readonly UserTwoFAUpdate: string;
  public static readonly UserTwoFANotFound: string;
  public static readonly UserTwoFADeleted: string;
	public static readonly UserTwoFAAdded: string;
	public static readonly UserTwoFAGetByUserId: string;
  public static readonly TwoFAVerify: string;
}
