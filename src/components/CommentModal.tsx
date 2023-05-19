import React from 'react';
import {StyleSheet} from "react-native";

import BottomSheetModal from "./BottomSheetModal";

import Comment from "./Comment";

export type Props = React.ComponentProps<typeof Comment> & React.ComponentProps<typeof BottomSheetModal>
const CommentModal = ({visible, setVisible, postId, postType}: Props, ref: React.Ref<any>) => {
    return <>
        <BottomSheetModal height={'60%'} visible={visible} setVisible={setVisible} isPadding={false}>
            <Comment postId={postId} postType={postType}/>
        </BottomSheetModal>
    </>
};

const styles = StyleSheet.create({})

export default React.forwardRef(CommentModal);
