import * as React from 'react';
import Modal from 'react-modal';
import { useState } from 'react';
import { StorageArea, IStorageAccessor } from '@spadin/webextension-storage';
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

interface TextItem {
    message: string;
    fallback: string;
}

const ResetOneTitleText = {
    message: '@options_reset_title',
    fallback: 'Reset setting',
};
const ResetOneMessageText =  {
    message: '@options_reset_message',
    fallback: 'Reset this setting to its default value?',
};
const ResetAllTitleText = {
    message: '@options_reset_all_title',
    fallback: 'Reset all settings',
};
const ResetAllMessageText = {
    message: '@options_reset_all_message',
    fallback: 'Reset all settings to their default values?',
};
const ResetButtonText = {
    message: '@options_reset_button',
    fallback: 'Reset',
};
const CancelButtonText = {
    message: '@options_cancel_button',
    fallback: 'Cancel',
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
    }, [props.accessor, props.storage, propText, oneText, allText])
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
            handleModalOpen();
        } else {
            await reset();
        }
    }

    async function handleConfirmClick() {
        handleModalClose();
        await reset();
    }

    function handleModalOpen() {
        setModalOpen(true);
    }

    function handleModalClose() {
        setModalOpen(false);
    }

    return (
        <span className="input reset browser-style">
            <button onClick={handleResetClick}>
                {props.label}
            </button>
            <Modal
                contentLabel="Reset setting"
                isOpen={isModalOpen}
                onAfterOpen={handleModalOpen}
                onRequestClose={handleModalClose}
                className="modal"
                overlayClassName="modal-overlay"
                >
                <h1>{confirmTitle}</h1>
                <p>{confirmMessage}</p>
                <div className="button-container">
                    <button
                        className='cancel'
                        onClick={handleModalClose}
                        >
                        {confirmCancelText}
                    </button>
                    <button
                        className='confirm'
                        onClick={handleConfirmClick}
                        >
                        {confirmResetText}
                    </button>
                </div>
            </Modal>
        </span>
    );
}

export default ResetButton;
