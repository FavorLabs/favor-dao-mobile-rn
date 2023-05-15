import React, {useImperativeHandle, useRef, useState} from 'react';
import {StyleSheet} from "react-native";

import BottomSheet from "./BottomSheet";

import Comment from "./Comment";

export type Props = React.ComponentProps<typeof Comment>
const CommentModal = ({postId, postType}: Props, ref: React.Ref<any>) => {
    const bottomSheetRef = useRef();
    useImperativeHandle(ref, () => bottomSheetRef.current)

    return <>
        <BottomSheet
          ref={bottomSheetRef}
        >
            <Comment postId={postId} postType={postType}/>
        </BottomSheet>
    </>
};

const styles = StyleSheet.create({})

export default React.forwardRef(CommentModal);
