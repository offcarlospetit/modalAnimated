import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableWithoutFeedback,
  PanResponder
} from 'react-native';
const { width, height } = Dimensions.get('window');
const HEIGHT_MODAL = height * 0.6


export interface ActionSeehtProps {
  visible: boolean;
  onAnimationEnd: () => void;
  onAnimationCloseEnd?: () => void;
  onAnimationOpenEnd?: () => void;
}

export const ActionSeeht: React.FC<ActionSeehtProps> = props => {
  const [heigthModal, setAligment] = useState(new Animated.Value(0));
  const [heigthView, setHeigthView] = useState(new Animated.Value(0));
  const [visible, setVisible] = useState(props.visible);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      if (HEIGHT_MODAL - gestureState.dy < HEIGHT_MODAL)
        heigthModal.setValue(HEIGHT_MODAL - gestureState.dy)
    },
    onPanResponderRelease: (e, gesture) => {
      const shouldOpen = gesture.moveY >= 730;
      console.log(gesture, shouldOpen)
      shouldOpen ? closeModal() : openModal()
    },
  })

  function closeModal() {
    Animated.parallel([
      Animated.spring(heigthModal, {
        toValue: 0,
        velocity: 6,
        tension: 2,
        friction: 8,
        useNativeDriver: false,
      }),
      Animated.spring(heigthView, {
        toValue: 0,
        velocity: 1,
        tension: 2,
        friction: 8,
        useNativeDriver: false,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        props.onAnimationCloseEnd ? props.onAnimationCloseEnd() : null;
      }
    });
  }
  function openModal() {
    Animated.parallel([
      Animated.spring(heigthModal, {
        toValue: height * 0.6,
        velocity: 10,
        tension: 2,
        friction: 3,
        useNativeDriver: false,
      }),
      Animated.spring(heigthView, {
        toValue: height,
        velocity: 30,
        tension: 1,
        friction: 8,
        useNativeDriver: false,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        props.onAnimationOpenEnd ? props.onAnimationOpenEnd() : null;
      }
    });
  }

  useEffect(() => {
    if (props.visible) {
      openModal();
    }
  });

  const actionSheetStyle = {
    height: heigthModal,
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => closeModal()}>
        <Animated.View style={[styles.animatedBaseContainer, { height: heigthView },]}></Animated.View>
      </TouchableWithoutFeedback>
      <Animated.View {...panResponder.panHandlers} style={[styles.container, actionSheetStyle]}>
        <View style={styles.separatorView} />
        <View style={styles.wrapperContainer}>{props.children}</View>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'flex-start',
    alignItems: 'center',
    left: 0,
    right: 0,
    height: 0,
    width: width,
    bottom: 0,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  animatedBaseContainer: {
    flex: 1,
    width,
    position: 'absolute',
    backgroundColor: 'rgba(0.867,0.89, 0.918, 1)',
    opacity: 0.5,
    bottom: 0,
  },
  separatorView: {
    height: height * 0.6 * 0.15,
    width,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  wrapperContainer: {
    height: height * 0.6 * 0.85,
    width,
    alignItems: 'center',
  },
});
