import Comment from './components/Comment';
import CommentForm from './components/CommentForm';
import UserForm from './components/UserForm';
import { UserProvider } from './context/user';
import { RootProvider, RootConsumer } from './context/root';

function App({ config }) {
  return (
    <RootProvider config={config}>
      <UserProvider>
        <div className="relative text-left mx-auto px-2 sm:px-4">
            <UserForm />
            <CommentForm />
            <div>
              <RootConsumer>
                {({ comments, rootEvent }) => {
                  if (comments && comments.length > 0) {
                    const times = {};
                    comments.forEach((c) => { times[c.id] = c.created_at; });

                    return comments
                      .filter((value, index, self) =>
                        index === self.findIndex((t) => t.id === value.id)
                      )
                      .sort((a, b) => {
                        const aTags = a.tags.filter((t) => t[0] === 'e');
                        const bTags = b.tags.filter((t) => t[0] === 'e');
                        const aParent = aTags.length > 1 ? aTags[aTags.length - 1][1] : null;
                        const bParent = bTags.length > 1 ? bTags[bTags.length - 1][1] : null;

                        if (!aParent && !bParent) {
                          return b.created_at - a.created_at;
                        }
                        if (!aParent) return -1;
                        if (!bParent) return 1;

                        if (aParent === bParent) {
                          return a.created_at - b.created_at;
                        }

                        return (times[aParent] || 0) - (times[bParent] || 0);
                      })
                      .map((comment, i) => <Comment key={comment.id} comment={comment} />);
                  }

                  return <></>;
                }}
              </RootConsumer>
            </div>
          </div>
      </UserProvider>
    </RootProvider>
  )
}

export default App
