import React from "react";
import { create } from "react-test-renderer";
import ProfileStatus from "./ProfileStatus";

describe("ProfileStatus component", () => {
  let statusText = 'test status';
  test("status from props should be in the state", () => {
    const component = create(<ProfileStatus status={statusText} />);
    const instance = component.getInstance();
    expect(instance.state.status).toBe(statusText);
  });

  test("after creation <input> shouldn't be displayed", () => {
    const component = create(<ProfileStatus status={statusText} />);
    const root = component.root;
    expect(() => {
      root.findByType('input');
    }).toThrow();
  });

  test("after creation <span> should contains correct status", () => {
    const component = create(<ProfileStatus status={statusText} />);
    const root = component.root;
    let span = root.findByType('span');
    expect(span.props.children).toBe(statusText);
  });

  test("input should be displayed after double click", () => {
    const component = create(<ProfileStatus status={statusText} />);
    const root = component.root;
    let span = root.findByType('span');
    span.props.onDoubleClick();
    let input = root.findByType('input');
    expect(input.props.value).toBe(statusText);
  });

  test("input should be displayed after double click", () => {
    const mockCallback = jest.fn();
    const component = create(<ProfileStatus status={statusText} updateStatus={mockCallback} />);
    const instance = component.getInstance();
    instance.deactivateEditMode();
    expect(mockCallback.mock.calls.length).toBe(1);
  });
});
