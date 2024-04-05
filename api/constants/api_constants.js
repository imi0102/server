class ApiConstants {

    //End Points  
    static get CREATE_ADMIN_ACCOUNT() {
      return '/createAdminAccount';
    }
  
    static get CREATE_FAMILY_MEMBER_ACCOUNT() {
      return '/createFamilyMemberAccount';
    }

    static get LOGIN_FAMILY_MEMBER() {
      return '/loginFamilyMember';
    }
  
    static get ADD_FAMILY_CODE() {
      return '/addFamilyCode';
    }   
    
      static get ADD_EXPENSE() {
        return '/addExpense';
      }
    
      static get UPDATE_MEMBER_WALLET_BALANCE() {
        return '/updateMemberWalletBalance';
      }
    
      static get GET_EXPENSE_DATA() {
        return '/getExpenseData';
      }
    
      static get GET_FAMILY_MEMBERS() {
        return '/getFamilyMembers';
      }
    
      static get GET_WALLET_BALANCE_HISTORY() {
        return '/getWalletBalanceHistory';
      }


    //Collections
    static get FAMILY_MEMBERS_COLLECTION() {
        return 'family_member';
    }
    WalletBalanceHistory
    static get FAMILY_CODES_COLLECTION() {
        return 'family_code';
    }
    static get WALLET_BALANCE_HISTORY_COLLECTION() {
      return 'wallet_balance_history';
  }
  static get EXPENSE_COLLECTION() {
    return 'expense';
}
}
module.exports = ApiConstants;
    