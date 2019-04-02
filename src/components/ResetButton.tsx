import * as React from 'react';
import { useState } from 'react';
import Modal from 'react-modal';

import { IStorageAccessor, StorageArea } from '@spadin/webextension-storage';

import { useMessage } from '../i18n';

export interface ResetButtonProps {
    /**
     * The setting to reset when clicked. Mutually exclusive with `storage`.
     */
    accessor?: IStorageAccessor<any>;

    /**
     * The storage area in which to reset all settings when clicked.
     * Mutually exclusive with `accessor`.
     */
    storage?: StorageArea<any>;

    /** Text to display on the button. */
    label: string;

    /** Require an additional confirmation after clicking the reset button? */
    confirm?: boolean;

    /**
     * The title for the confirmation dialog. If omitted, falls back to
     * `"@options_reset_title"` or `"@options_reset_all_title"` from the current
     * locale's messages.json.
     */
    confirmTitle?: string;

    /**
     * The message for the confirmation dialog. If omitted, falls back to
     * `"@options_reset_message"` or `"@options_reset_all_message"` from the
     * current locale's messages.json.
     */
    confirmMessage?: string;

    /**
     * The text for the confirmation dialog's reset button. If omitted, falls
     * back to `"@options_reset_button"` from the current locale's messages.json.
     */
    confirmResetText?: string;

    /**
     * The text for the confirmation dialog's cancel button. If omitted, falls
     * back to `"@options_reset_button"` from the current locale's messages.json.
     */
    confirmCancelText?: string;
}

/**
 * Button which resets a setting or all settings to their default values when
 * pressed, with an optional confirmation dialog.
 *
 * Set `props.storage` to reset all settings in the storage area, or set
 * `props.accessor` to reset a single setting.
 */
export const ResetButton: React.FunctionComponent<ResetButtonProps> = (props) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const confirmTitle = useOneOrAllText(props, props.confirmTitle, ResetOneTitleText, ResetAllTitleText);
    const confirmMessage = useOneOrAllText(props, props.confirmMessage, ResetOneMessageText, ResetAllMessageText);
    const confirmResetText = useText(props.confirmResetText, ResetButtonText);
    const confirmCancelText = useText(props.confirmCancelText, CancelButtonText);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    async function reset() {
        if (props.accessor) {
            await props.accessor.reset();
        } else if (props.storage) {
            await props.storage.resetAll();
        } else {
            throw new Error('Either accessor or storage must be set');
        }
    }

    async function handleResetClick() {
        if (props.confirm) {
            openModal();
        } else {
            await reset();
        }
    }

    async function handleConfirmClick() {
        closeModal();
        await reset();
    }

    return (
        <span className="input reset browser-style">
            <button onClick={handleResetClick}>
                {props.label}
            </button>
            <Modal
                contentLabel="Reset setting"
                isOpen={isModalOpen}
                onAfterOpen={openModal}
                onRequestClose={closeModal}
                className="modal"
                overlayClassName="modal-overlay"
                >
                <main>
                    <h1>{confirmTitle}</h1>
                    <p>{confirmMessage}</p>
                </main>
                <footer>
                    <button
                        className="cancel"
                        onClick={closeModal}
                        >
                        {confirmCancelText}
                    </button>
                    <button
                        className="confirm"
                        onClick={handleConfirmClick}
                        >
                        {confirmResetText}
                    </button>
                </footer>
            </Modal>
        </span>
    );
};

export default ResetButton;

interface TextItem {
    message: string;
    fallback: string;
}

const ResetOneTitleText: TextItem = {
    fallback: 'Reset setting',
    message: '@options_reset_title',
};
const ResetOneMessageText: TextItem =  {
    fallback: 'Reset this setting to its default value?',
    message: '@options_reset_message',
};
const ResetAllTitleText: TextItem = {
    fallback: 'Reset all settings',
    message: '@options_reset_all_title',
};
const ResetAllMessageText: TextItem = {
    fallback: 'Reset all settings to their default values?',
    message: '@options_reset_all_message',
};
const ResetButtonText: TextItem = {
    fallback: 'Reset',
    message: '@options_reset_button',
};
const CancelButtonText: TextItem = {
    fallback: 'Cancel',
    message: '@options_cancel_button',
};

function useText(propText: string | undefined, text: TextItem) {
    const message = useMessage(text.message);

    return propText || message || text.fallback;
}

function useOneOrAllText(props: ResetButtonProps, propText: string | undefined, oneText: TextItem, allText: TextItem) {
    const oneMessage = useMessage(oneText.message);
    const allMessage = useMessage(allText.message);

    return React.useMemo(() => {
        if (propText) {
            return propText;
        }

        if (props.accessor) {
            return oneMessage || oneText.fallback;
        } else if (props.storage) {
            return allMessage || allText.fallback;
        } else {
            throw new Error('Either accessor or storage must be set');
        }
    }, [props.accessor, props.storage, propText, oneText, allText]);
}
