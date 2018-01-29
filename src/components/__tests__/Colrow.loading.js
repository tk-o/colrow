import { setup } from './Colrow';

test('should call `onLoading` action while changing in loading state', () => {
  const onLoadingSpy = jest.fn();

  const { wrapper } = setup({
    onLoading: onLoadingSpy,
    isLoading: false,
  });

  wrapper.setProps({ isLoading: true });

  expect(onLoadingSpy).toHaveBeenCalledTimes(1);
});

test('should call `onLoaded` action while changing from loading state', () => {
  const onLoadedSpy = jest.fn();

  const { wrapper } = setup({
    onLoaded: onLoadedSpy,
    isLoading: true,
  });

  wrapper.setProps({ isLoading: false });

  expect(onLoadedSpy).toHaveBeenCalledTimes(1);
});

test('calls proper actions on loading state change', () => {
  const onLoadingSpy = jest.fn();
  const onLoadedSpy = jest.fn();

  const { wrapper } = setup({
    onLoading: onLoadingSpy,
    onLoaded: onLoadedSpy,
    isLoading: false,
  });

  wrapper.setProps({ isLoading: false });

  expect(onLoadingSpy).toHaveBeenCalledTimes(0);
  expect(onLoadedSpy).toHaveBeenCalledTimes(0);

  wrapper.setProps({ isLoading: false });
  wrapper.setProps({ isLoading: true });

  expect(onLoadingSpy).toHaveBeenCalledTimes(1);
  expect(onLoadedSpy).toHaveBeenCalledTimes(0);

  wrapper.setProps({ isLoading: false });
  wrapper.setProps({ isLoading: true });
  wrapper.setProps({ isLoading: true });

  expect(onLoadingSpy).toHaveBeenCalledTimes(2);
  expect(onLoadedSpy).toHaveBeenCalledTimes(1);

  onLoadingSpy.mockClear();
  onLoadedSpy.mockClear();

  wrapper.setProps({ isLoading: true });

  expect(onLoadingSpy).toHaveBeenCalledTimes(0);
  expect(onLoadedSpy).toHaveBeenCalledTimes(0);
});
