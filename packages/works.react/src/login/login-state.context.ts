import { useProfile, useProfileAndWatch, ZProfileContext } from '../profile/profile.context';

/**
 * Represents the context for the globally provided login state.
 *
 * @deprecated Use @see ZProfileContext instead.
 */
export const ZLoginStateContext = ZProfileContext;

/**
 * Retrieves the current globally provided login state.
 *
 * A change to the login state from this hook will not refresh your component.
 * Use @see useLoginState if you need your component to refresh when the state changes.
 *
 * @deprecated Use @see useProfile instead.
 *
 * @returns The global login state.
 */
export const useLogin = useProfile;

/**
 * Retrieves the current globally provided login state.
 *
 * A change to the login state from this hook will refresh your component.  If you do not
 * need your component to refresh, use @see useLogin instead.
 *
 * @deprecated Use @see useProfileAndWatch instead.
 *
 * @returns The global login state.
 */
export const useLoginState = useProfileAndWatch;
