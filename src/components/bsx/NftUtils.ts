type Id = string | number;

export enum NFTAction {
  SEND='SEND',
  CONSUME='CONSUME',
  FREEZE='FREEZE',
  DELEGATE='DELEGATE',
  THAW='THAW',
  REVOKE='REVOKE',
  NONE='',
}

export const actionResolver: Record<NFTAction, [string, string]> = {
  SEND: ['uniques','transfer'],
  CONSUME: ['uniques','burn'],
  DELEGATE: ['uniques','approveTransfer'],
  FREEZE: ['uniques','freeze'],
  THAW: ['uniques','thaw'],
  REVOKE: ['uniques','cancelApproval'],
  '': ['',''],
}

class NFTUtils {
  static createCollection(id: Id, admin: string, metadata: string): [string, string, string] {
    return [String(id), admin, metadata]
  }

  static createNFT(classId: Id, id: Id, owner: string, royalty: number, metadata: string)  {
    return [String(classId), String(id), owner, royalty, metadata]
  }

  static getActionParams(selectedAction: NFTAction, classId: Id, id: Id, meta: string) {
    switch (selectedAction) {
    case NFTAction.SEND:
    case NFTAction.CONSUME:
    case NFTAction.DELEGATE:
      return [classId, id, meta]
    case NFTAction.FREEZE:
    case NFTAction.THAW:
      return [classId, id]
    default:
      throw new Error('Action not found')
    }
  }

  static apiCall(selectedAction: NFTAction) {
    return actionResolver[selectedAction] || new Error('Action not found')

  }

  static correctMeta(selectedAction: NFTAction, meta: string, currentOwner: string): string {
    switch (selectedAction) {
    case NFTAction.SEND:
    case NFTAction.DELEGATE:
      return meta
    case NFTAction.CONSUME:
      return currentOwner
    case NFTAction.FREEZE:
    case NFTAction.THAW:
      return ''
    default:
      throw new Error('Action not found')
    }
  }
}



export default NFTUtils
